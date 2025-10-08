import {
  Quote,
  Building,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
interface Recommendation {
  id: string;
  recommender_name: string;
  recommender_title: string;
  recommender_company: string;
  recommender_location: string;
  recommendation_text: string;
  linkedin_url: string;
  recommendation_date: string;
}
export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    recommender_name: "",
    recommender_title: "",
    recommender_company: "",
    recommender_location: "",
    recommendation_text: "",
    linkedin_url: "",
    email: "",
  });

  const fetchRecommendations = () => {
    setLoading(true);
    fetch("https://wassim221e.pythonanywhere.com/api/recommendations/getall")
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recommendations:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.recommender_name || !form.recommendation_text || !form.email) {
      setError("الاسم والبريد ونص التوصية مطلوبة");
      return;
    }
    const emailValid = /.+@.+\..+/.test(form.email);
    if (!emailValid) {
      setError("البريد غير صالح");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        "https://wassim221e.pythonanywhere.com/api/recommendations/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to submit recommendation");
      }
      setOpen(false);
      setForm({
        recommender_name: "",
        recommender_title: "",
        recommender_company: "",
        recommender_location: "",
        recommendation_text: "",
        linkedin_url: "",
        email: "",
      });
      fetchRecommendations();
    } catch (err: any) {
      setError(err.message || "حدث خطأ ما");
    } finally {
      setSubmitting(false);
    }
  };

  


  
  console.assert(recommendations);
  if (loading) {
    return <p className="text-center py-20">Loading recommendations...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <ScrollAnimation direction="up">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Recommendations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            What colleagues, clients, and mentors have to say about working with
            me. These testimonials reflect my commitment to excellence and
            collaborative approach.
          </p>

          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="text-gray-600 dark:text-gray-300">
              ({recommendations.length} recommendations)
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="relative bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all ring-2 ring-purple-400/50 animate-pulse-glow">Add Recomendation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Recomendation</DialogTitle>
                </DialogHeader>
                {error && (
                  <div className="text-red-600 text-sm mb-2">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recommender_name">Full Name</Label>
                      <Input
                        id="recommender_name"
                        value={form.recommender_name}
                        onChange={(e) =>
                          setForm({ ...form, recommender_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="recommender_title">Job title</Label>
                      <Input
                        id="recommender_title"
                        value={form.recommender_title}
                        onChange={(e) =>
                          setForm({ ...form, recommender_title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="recommender_company">Company</Label>
                      <Input
                        id="recommender_company"
                        value={form.recommender_company}
                        onChange={(e) =>
                          setForm({ ...form, recommender_company: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="recommender_location">Location</Label>
                      <Input
                        id="recommender_location"
                        value={form.recommender_location}
                        onChange={(e) =>
                          setForm({ ...form, recommender_location: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="recommendation_text">Recomencation text</Label>
                    <Textarea
                      id="recommendation_text"
                      value={form.recommendation_text}
                      onChange={(e) =>
                        setForm({ ...form, recommendation_text: e.target.value })
                      }
                      required
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin_url">LinkedIn link (optional)</Label>
                      <Input
                        id="linkedin_url"
                        value={form.linkedin_url}
                        onChange={(e) =>
                          setForm({ ...form, linkedin_url: e.target.value })
                        }
                        type="url"
                        placeholder="https://www.linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Sending..." : "Send"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </ScrollAnimation>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recommendations.map((rec, index) => (
          <ScrollAnimation
            key={rec.id}
            direction="up"
            delay={0.1 * index}
          >
            <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600">
              <CardContent className="p-8 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {rec.recommender_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {rec.recommender_name}
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-1">
                        {rec.recommender_title}
                      </p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                        <Building className="w-3 h-3 mr-1" />
                        <span className="truncate">
                          {rec.recommender_company}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{rec.recommender_location}</span>
                      </div>
                    </div>
                  </div>

                  {/* External link */}
                  <a
                    href={rec.linkedin_url}
                    className="p-2 text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0"
                    title="View LinkedIn Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500">
                    {formatDate(rec.recommendation_date)}
                  </span>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <Quote className="w-8 h-8 text-purple-200 dark:text-purple-600 mb-4" />
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{rec.recommendation_text}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        ))}
      </div>

      {/* Call to Action */}
      <ScrollAnimation direction="up" delay={0.3}>
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-8 lg:p-12 border border-purple-100 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Work Together?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always open to new opportunities and exciting projects. Let's
              discuss how we can create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => (window.location.href = "/contact")}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "/about")}
              >
                Learn More About Me
              </Button>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

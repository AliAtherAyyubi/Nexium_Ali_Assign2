'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Sparkles, Link as LinkIcon } from 'lucide-react';
import LoadingSpinner from './spinner';
import SummaryCard from './summaryCard';
// import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

//
const BlogSummarizer = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<{
    english: string;
    urdu: string;
    title: string;
  } | null>(null);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
//
const postData = async (summary:string) => {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: summary,
    }),
  });

  const data = await res.json();
  console.log("Saved with ID:", data.id);
};

//
  const handleSummarize = async () => {
    if (!url.trim()) {
      toast(
        "URL Required",{
        description: "Please enter a blog URL to summarize"}
      );
      return;
    }

    if (!isValidUrl(url)) {
      toast(
        "InValid URL ",{
        description: "Please enter a valid URL"}
      );
      return;
    }
    setIsLoading(true);
    setSummary(null);

    // Simulate API call delay
    setTimeout(() => {
      // Mock summary data - replace with actual API call
      setSummary({
        title: "Understanding Modern Web Development",
        english: "This comprehensive blog post explores the latest trends in modern web development, covering topics such as component-based architecture, state management, and performance optimization. The author discusses the evolution from traditional server-side rendering to modern client-side frameworks, highlighting the benefits of tools like React, Vue, and Angular. Key concepts include the importance of responsive design, accessibility standards, and the growing emphasis on user experience. The post also delves into emerging technologies like WebAssembly, Progressive Web Apps, and the impact of AI on development workflows.",
        urdu: "یہ جامع بلاگ پوسٹ جدید ویب ڈیولپمنٹ میں تازہ ترین رجحانات کو دریافت کرتی ہے، جس میں کمپوننٹ پر مبنی آرکیٹیکچر، سٹیٹ مینجمنٹ، اور کارکردگی کی بہتری جیسے موضوعات شامل ہیں۔ مصنف نے روایتی سرور سائیڈ رینڈرنگ سے جدید کلائنٹ سائیڈ فریم ورکس کی طرف ارتقاء پر بحث کی ہے، React، Vue، اور Angular جیسے ٹولز کے فوائد کو اجاگر کرتے ہوئے۔ اہم تصورات میں ریسپانسو ڈیزائن کی اہمیت، رسائی کے معیارات، اور صارف کے تجربے پر بڑھتا ہوا زور شامل ہے۔"
      });
      setIsLoading(false);
      
      toast("Summary Generated!",{
        description: "Your blog has been successfully summarized in both languages.",
      });
    }, 2000);
    await postData(summary?.english || "No summary generated");

  };

  const handleClear = () => {
    setUrl('');
    setSummary(null);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="url"
                placeholder="Paste your blog URL here (e.g., https://example.com/blog-post)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 h-14 text-lg border-2 border-slate-200 focus:border-blue-400 transition-colors"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleSummarize}
                disabled={isLoading || !url.trim()}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isLoading ? 'Summarizing...' : 'Summarize Blog'}
              </Button>
              
              {(url || summary) && (
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="h-12 px-6 border-2 hover:bg-slate-50 cursor-pointer"
                  disabled={isLoading}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <LoadingSpinner />
          </motion.div>
        )}

        {summary && !isLoading && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SummaryCard
              title={summary.title}
              englishSummary={summary.english}
              urduSummary={summary.urdu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogSummarizer;
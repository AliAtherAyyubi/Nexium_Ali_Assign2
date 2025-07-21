'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sparkles, Link as LinkIcon } from 'lucide-react';
import LoadingSpinner from './spinner';
import SummaryCard from './summaryCard';
import { blogContent,blogSummary,urduTranslation } from '../../utils/textProcessor';
import { showErrorToast,showSuccessToast,showWarningToast } from '../../utils/toast';
import { Title } from './title';
//
const BlogSummarizer = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Blog, setBlog] = useState({
    title: '',
    fullBlog: '',
    summary: '',
    urdu: '',
  });

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  };
//  Method to save blog to MongoDB 
const saveToMongo = async (blog:string) => {
  const res = await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blog: blog,
    }),
  });

  if (res.ok) {
    showSuccessToast("Blog Saved", "Blog content has been saved successfully into Cloud MongoDB.");
  }
  else{
    showErrorToast("Save Failed", "There was an error into MongoDB server.");
  }
};

const saveToSupabase = async (blog:string,urdu:string) => {
  const res = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: blog,
      urdu: urdu 
    }),
  });

 if (res.ok) {
    showSuccessToast("Data Saved", "Your summary has been saved successfully into Supabase.");
  }
  else{
    showErrorToast("Save Failed", "There was an error into Supabase.");
  }
};

//
  const handleSummarize = async () => {
    if (!url.trim()) {
      showWarningToast("URL Required", "Please enter a blog URL to summarize");
      return;
    }

    if (!isValidUrl(url)) {
      showErrorToast("Invalid URL", "The URL you entered is not valid. Please check and try again.");
      return;
    }
    setIsLoading(true);
    setBlog({
      title: '',
      fullBlog: '',
      summary: '',
      urdu: '',
    });

    // Simulate API call delay
    setTimeout(() => {
      // Mock summary data - replace with actual API call
      setBlog({
        title: "Understanding Artificial Intelligence",
        fullBlog: blogContent,
        summary: blogSummary,
        urdu: urduTranslation
      });
      setIsLoading(false);
      
      showSuccessToast("Summary Generated", "Your blog has been successfully summarized in both languages.");
    }, 2000);
    await saveToMongo(Blog.fullBlog);
    await saveToSupabase(Blog.summary,Blog.urdu)

  };

  const handleClear = () => {
    setUrl('');
    setBlog({
      title: '',
      fullBlog: '',
      summary: '',
      urdu: '',
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Title/>
        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="url"
                placeholder="Paste your blog URL here (e.g., https://example.com/blog-post)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 h-14 text-lg border-2 w-full border-slate-200 focus:border-blue-400 transition-colors"
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
              
              {(url || Blog.title!='') && (
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

        {Blog.title!='' && !isLoading && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SummaryCard
              title={Blog.title}
              blog={Blog.fullBlog}
              englishSummary={Blog.summary}
              urduSummary={Blog.urdu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogSummarizer;
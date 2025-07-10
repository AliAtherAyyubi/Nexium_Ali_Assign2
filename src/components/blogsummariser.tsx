import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Globe, FileText, Languages } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
import { extractTextFromUrl, generateSummary, translateToUrdu } from '@/utils/textProcessor';

const BlogSummariser = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [englishSummary, setEnglishSummary] = useState('');
  const [urduSummary, setUrduSummary] = useState('');
  const [currentStep, setCurrentStep] = useState('');
//   const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return string.startsWith('http://') || string.startsWith('https://');
    } catch (_) {
      return false;
    }
  };

  const handleSummarize = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid blog URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setExtractedText('');
    setEnglishSummary('');
    setUrduSummary('');

    try {
      // Step 1: Extract text from URL
      setCurrentStep('Extracting content from the blog...');
      console.log('Starting text extraction from URL:', url);
      const text = await extractTextFromUrl(url);
      setExtractedText(text);
      console.log('Extracted text length:', text.length);

      // Step 2: Generate English summary
      setCurrentStep('Generating English summary...');
      console.log('Starting English summary generation');
      const summary = await generateSummary(text);
      setEnglishSummary(summary);
      console.log('English summary generated:', summary.substring(0, 100) + '...');

      // Step 3: Translate to Urdu
      setCurrentStep('Translating to Urdu...');
      console.log('Starting Urdu translation');
      const urduTranslation = await translateToUrdu(summary);
      setUrduSummary(urduTranslation);
      console.log('Urdu translation completed');

      toast({
        title: "Success!",
        description: "Blog has been successfully summarized in both languages",
      });

    } catch (error) {
      console.error('Error in summarization process:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process the blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCurrentStep('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe className="h-6 w-6 text-blue-600" />
            Enter Blog URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/blog-post"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 text-lg border-2 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
            <Button
              onClick={handleSummarize}
              disabled={isLoading || !url}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Summarize'
              )}
            </Button>
          </div>
          
          {isLoading && currentStep && (
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">{currentStep}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {(englishSummary || urduSummary) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* English Summary */}
          {englishSummary && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-green-800">
                  <FileText className="h-5 w-5" />
                  English Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {englishSummary}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Urdu Summary */}
          {urduSummary && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-purple-800">
                  <Languages className="h-5 w-5" />
                  اردو خلاصہ (Urdu Summary)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-right" dir="rtl">
                    {urduSummary}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Extracted Text Preview (for debugging) */}
      {extractedText && (
        <Card className="border-0 shadow-lg bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">
              Extracted Content Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-4">
              {extractedText.substring(0, 300)}...
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Total characters extracted: {extractedText.length}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogSummariser;
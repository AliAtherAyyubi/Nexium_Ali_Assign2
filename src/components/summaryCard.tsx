import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, BookOpen, Globe } from 'lucide-react';
import {motion} from 'motion/react';
import { toast } from 'sonner';
//
interface SummaryCardProps {
  title: string;
  englishSummary: string;
  urduSummary: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  englishSummary,
  urduSummary,
}) => {

  const copyToClipboard = (text: string, language: string) => {
    navigator.clipboard.writeText(text);
    toast( "Copied!",{
      description: `${language} summary copied to clipboard`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="flex items-start gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Blog Summary
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">English Summary</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(englishSummary, 'English')}
              className="hover:bg-blue-100"
            >
              <Copy className="h-4 w-4 mr-1 cursor-pointer" />
              Copy
            </Button>
          </div>
          <p className="text-slate-700 leading-relaxed text-justify">
            {englishSummary}
          </p>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">اردو خلاصہ</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(urduSummary, 'Urdu')}
              className="hover:bg-purple-100 cursor-pointer"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <p className="text-slate-700 leading-relaxed text-justify font-urdu" dir="rtl">
            {urduSummary}
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCard;
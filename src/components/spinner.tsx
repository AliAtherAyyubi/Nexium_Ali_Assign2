import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Loader2, BookOpen, Languages } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm max-w-md w-full">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex justify-center"
        >
          <div className="relative">
            <Loader2 className="h-12 w-12 text-blue-500" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-blue-100"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Processing Your Blog
          </h3>
          
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-slate-600"
            >
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span>Reading and analyzing content...</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 text-slate-600"
            >
              <Languages className="h-5 w-5 text-purple-500" />
              <span>Generating bilingual summary...</span>
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm text-slate-500"
          >
            This may take a few moments
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default LoadingSpinner;
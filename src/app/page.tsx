import BlogSummariser from "@/components/blogsummariser";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container flex flex-col justify-center max-w-[1040px] mx-auto px-10 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-8 text-blue-600 font-bold tracking-tighter md:text-8xl lg:text-8xl">
            Blog <AuroraText>Summarizer</AuroraText>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract and summarize any blog post with AI-powered analysis. Get summaries in both English and Urdu.
          </p>
        </div>
        <BlogSummariser />
      </div>
    </div>
  );
}

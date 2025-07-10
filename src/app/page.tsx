import BlogSummariser from "@/components/blogsummariser";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-10">
            Blog Summariser
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

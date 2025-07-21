import BlogSummariser from "@/components/blogsummariser";
//
export default async function Home() {
  
  return (
    <div className="min-h-screen  bg-[linear-gradient(95.2deg,_rgba(173,252,234,1)_26.8%,_rgba(192,229,246,1)_64%)]
">
      <div className="container flex flex-col justify-center max-w-[1040px] mx-auto px-10 py-8">
        <BlogSummariser />
      </div>
    </div>
  );
}

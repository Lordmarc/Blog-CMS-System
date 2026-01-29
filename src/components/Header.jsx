export default function Header() {
  return (
    <div
      className="headings"
      data-alt="Abstract dark blue gradient with code-like patterns"
      style={{
        backgroundImage: 'linear-gradient(rgba(19, 19, 236, 0.7) 0%, rgba(16, 16, 34, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA1I4fLGJI1gqtpLWe2URS3-I6dgAV4l0FtPqYh1aoDfw4Y-l6FPY2T-MsM1cvftPLJtgGzR-g94NzeA5Bx16s07bbGN67FcePBtzVdcH5EINOVBva7A58iyq0ph6vX2odnZfqb7ffGUUXhzDAvYmAEATuao-VPlSw3MOTaoVewatHmJOWoxuz9ERCXUwGhuB-g3mNdM_VA--k8uDuK_gmGj14maCqA9pdzToqWUPMclTNM5_A9219FzikTVRe4jovpeqmz6Wmqn8")'
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-6xl font-semibold text-white block">Welcome to my Code & Thoughts</h2>
        <p className="text-center text-xl text-gray-300 max-w-2xl">
          Exploring the world of full-stack development, clean architecture, and
          modern web technologies. Tips, tutorials, and deep dives.
        </p>
      </div>

      <div className="w-full max-w-xs flex gap-2">
        <button className="flex items-center justify-center rounded-lg bg-[#1223e0] px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:translate-y-[-2px]">View All Posts</button>
        <button className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                                Subscribe </button>
      </div>
    </div>
  );
}

"use client";

export function HeroInspectionForm() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[28px]
        bg-black/45
        p-5
        shadow-2xl
        backdrop-blur-sm
        sm:p-7
      "
    >
      {/* Header */}
      <div
        className="
          relative
          mb-7
          bg-[#75333d]
          px-6
          py-6
          text-center
          text-white
        "
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%)",
        }}
      >
        <h2
          className="
            text-3xl
            font-black
            uppercase
            leading-none
            tracking-[0.02em]
            sm:text-4xl
          "
        >
          Book A Free Inspection
        </h2>

        <p className="mx-auto mt-4 max-w-[460px] text-base leading-6 text-white/90">
          Fill out the form below and one of our representatives will
          reach out within 24 hours.
        </p>
      </div>
        <iframe style={{width: "100%", height: "903px"}}  src="https://www-skywardroofs-com.filesusr.com/html/b391f4_b5c73aff3e521f23bbe0dec545e5e5c3.html"></iframe>
      
    </div>
  );
}


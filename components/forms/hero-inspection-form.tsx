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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        {/* First / Last */}
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={inputClasses}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={inputClasses}
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className={inputClasses}
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address Line"
          className={inputClasses}
        />

        {/* City / Zip */}
        <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
          <input
            type="text"
            name="city"
            placeholder="City"
            className={inputClasses}
          />

          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className={inputClasses}
          />
        </div>

        {/* Roof age / homeowner */}
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            name="roofAge"
            defaultValue=""
            className={selectClasses}
          >
            <option value="" disabled>
              How old is your roof?
            </option>

            <option value="0-5">
              0–5 years
            </option>

            <option value="6-10">
              6–10 years
            </option>

            <option value="11-15">
              11–15 years
            </option>

            <option value="16-20">
              16–20 years
            </option>

            <option value="20+">
              20+ years
            </option>

            <option value="unknown">
              Not sure
            </option>
          </select>

          <select
            name="homeowner"
            defaultValue=""
            className={selectClasses}
          >
            <option value="" disabled>
              Are you the homeowner?
            </option>

            <option value="yes">
              Yes
            </option>

            <option value="no">
              No
            </option>
          </select>
        </div>

        {/* Source */}
        <select
          name="referralSource"
          defaultValue=""
          className={selectClasses}
        >
          <option value="" disabled>
            Where did you hear about us?
          </option>

          <option value="google">
            Google
          </option>

          <option value="facebook">
            Facebook
          </option>

          <option value="instagram">
            Instagram
          </option>

          <option value="youtube">
            YouTube
          </option>

          <option value="referral">
            Friend / Referral
          </option>

          <option value="yard-sign">
            Yard Sign
          </option>

          <option value="other">
            Other
          </option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="
            mt-4
            inline-flex
            min-h-14
            items-center
            justify-center
            bg-[#75333d]
            px-9
            text-lg
            font-black
            uppercase
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white
            hover:text-[#75333d]
          "
        >
          Launch 🚀
        </button>
      </form>
    </div>
  );
}

const inputClasses = `
  h-14
  w-full
  rounded-md
  border
  border-white/20
  bg-white
  px-4
  text-base
  text-[#222]
  outline-none
  transition
  placeholder:text-black/40
  focus:border-[#75333d]
  focus:ring-2
  focus:ring-[#75333d]/20
`;

const selectClasses = `
  h-14
  w-full
  rounded-md
  border
  border-white/20
  bg-white
  px-4
  text-base
  text-black/60
  outline-none
  transition
  focus:border-[#75333d]
  focus:ring-2
  focus:ring-[#75333d]/20
`;
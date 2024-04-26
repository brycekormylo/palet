import { useColorContext } from "@/contexts/project_context";

const DemoUI = () => {
  const { current, primary, neutral, accents } = useColorContext();
  var hsl = require("hsl-to-hex");

  return (
    <div
      className={`flex flex-col justify-end items-end gap-2 w-[24rem] h-[30rem] rounded-xl`}
      style={{
        background: hsl(primary.hue, primary.saturation, primary.luminance),
      }}
    >
      <div
        className={`flex justify-center items-center flex-row gap-2 w-[23rem] h-[28rem] rounded-tl-lg rounded-br-xl p-4`}
        style={{
          background: hsl(neutral.hue, neutral.saturation, neutral.luminance),
        }}
      >
        <div
          className="rounded-md w-20 h-10"
          style={{
            background: hsl(primary.hue, primary.saturation, primary.luminance),
          }}
        ></div>
        <div
          className="rounded-md w-20 h-10"
          style={{
            border: `2px solid ${hsl(primary.hue, primary.saturation, primary.luminance)}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DemoUI;

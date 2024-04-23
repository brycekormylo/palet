import { useColorContext } from "@/contexts/project_context";

const DemoUI = () => {
  const { current } = useColorContext();
  var hsl = require("hsl-to-hex");

  return (
    <div className="flex gap-2">
      <div
        className="w-20 h-10 flex justify-center items-center"
        style={{
          background: hsl(current.hue, current.saturation, current.luminance),
        }}
      >
        <p className="text-lg text-white">Click me</p>
      </div>
      <div
        className="w-20 h-10 flex justify-center items-center"
        style={{
          background: hsl(current.hue, current.saturation, current.luminance),
        }}
      >
        <p className="text-lg text-black">Click me</p>
      </div>
    </div>
  );
};

export default DemoUI;

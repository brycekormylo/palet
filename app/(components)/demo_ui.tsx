import { useColorContext } from "@/contexts/project_context";
import { hslToRgb } from "@mui/material";

const DemoUI = () => {
  const { colors, index } = useColorContext();
  var hsl = require("hsl-to-hex");

  return (
    <div className="flex gap-2">
      <div
        className="w-20 h-10 flex justify-center items-center"
        style={{
          background: hsl(colors[index].hue, colors[index].saturation, colors[index].luminance)
        }}
      >
        <p className="text-lg text-white">Click me</p>
      </div>
      <div
        className="w-20 h-10 flex justify-center items-center"
        style={{
          background: hsl(colors[index].hue, colors[index].saturation, colors[index].luminance)
        }}
      >
        <p className="text-lg text-black">Click me</p>
      </div>
    </div>
  );
};

export default DemoUI;

import { useColorContext } from "@/contexts/project_context";

const NavBar = () => {
  const { colors, index } = useColorContext();
  var hsl = require("hsl-to-hex");
  return (
    <div
      className="flex flex-row w-full overflow-hidden justify-end items-center h-6 px-10"
      style={{
        background: hsl(
          colors[index].hue,
          colors[index].saturation,
          colors[index].luminance
        ),
      }}
    >
      <h1>palet</h1>
    </div>
  );
};

export default NavBar;

import { useColorContext } from "@/contexts/project_context";

const NavBar = () => {
  const { current } = useColorContext();
  var hsl = require("hsl-to-hex");
  return (
    <div
      className="flex flex-row w-full overflow-hidden justify-end items-center h-6 px-10"
      style={{
        background: hsl(
          current.hue,
          current.saturation,
          current.luminance
        ),
      }}
    >
      <h1>palet</h1>
    </div>
  );
};

export default NavBar;

const { animus } = require("@animus-ui/core");
const { createContext, useState } = require("react");

const PageBlur = animus
  .styles({
    transition: "filter ease 200ms",
  })
  .states({
    blur: {
      filter: "blur(50px)",
    },
  })
  .asComponent("div");

export const PortalContext = createContext({ toggleBlur: () => {} });

export const PortalProvider = ({ children }) => {
  const [blur, toggleBlur] = useState(false);
  console.log();

  return (
    <PortalContext.Provider value={{ toggleBlur }}>
      <PageBlur blur={blur}>{children}</PageBlur>
    </PortalContext.Provider>
  );
};

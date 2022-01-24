import Link from "next/link";
import { animus } from "@animus-ui/core";
import { useRouter } from "next/router";

const NavLink = animus
  .styles({
    textDecoration: "none",
    fontWeight: 700,
    display: "flex",
    justifyContent: "space-between",
    textTransform: "uppercase",
    alignItems: "center",
    color: "secondary",
    position: "relative",
    zIndex: 1,
    lineHeight: "var(--line-height-text)",
    "&:hover": {
      textDecoration: "none",
    },
  })
  .states({
    home: { color: "primary" },
    active: {
      "&:before": {
        content: '""',
        display: { _: "none", sm: "block" },
        bg: "var(--color-link-underline)",
        height: "0.75em",
        left: "-0.75rem",
        right: "-0.75rem",
        bottom: "0.25rem",
        position: "absolute",
        zIndex: -1,
        borderRadius: "calc(0.75em / 2)",
      },
    },
  })
  .groups({ typography: true })
  .asComponent("a");

export const Header = () => {
  const { asPath } = useRouter();
  const isHome = asPath === "home";
  return (
    <header role="banner" className="header">
      <nav className="navbar">
        <div className="navbar-section navbar-section__left">
          <Link passHref href="/">
            <NavLink
              display={isHome ? "none" : "flex"}
              href="/"
              fontSize={{ _: 16, sm: 20 }}
            >
              <h1 className="brand-logo">
                KARAOKE NITE
                <span className="brand-betatag">beta</span>
              </h1>
            </NavLink>
          </Link>
          <button className="navbar-toggle">
            <svg
              className="navbar-toggleIcon navbar-toggleIcon__open"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <use href="#menu" />
            </svg>
            <svg
              className="navbar-toggleIcon navbar-toggleIcon__close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <use href="#close" />
            </svg>
          </button>
        </div>
        <div className="navbar-section navbar-section__right">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link href="/about" passHref>
                <NavLink
                  active={asPath === "/about"}
                  fontSize={{ _: 16, sm: 20 }}
                >
                  About
                  <span className="navbar-linkIcon">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>
                  </span>
                </NavLink>
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/blog" passHref>
                <NavLink
                  active={asPath === "/blog"}
                  fontSize={{ _: 16, sm: 20 }}
                >
                  Blog
                  <span className="navbar-linkIcon">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>
                  </span>
                </NavLink>
              </Link>
            </li>
            <li className="navbar-item">
              <Link href="/faq" passHref>
                <NavLink
                  active={asPath === "/faq"}
                  fontSize={{ _: 16, sm: 20 }}
                >
                  FAQ
                  <span className="navbar-linkIcon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>{" "}
                  </span>
                </NavLink>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

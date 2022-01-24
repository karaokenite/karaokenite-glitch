import { animus } from "@animus-ui/core";
import { useRouter } from "next/router";
import { Link, Text } from "@animus-ui/components";

export const Header = () => {
  const { asPath } = useRouter();
  const isHome = asPath === "home";
  return (
    <header role="banner" className="header">
      <nav className="navbar">
        <div className="navbar-section navbar-section__left">
          <Link display={isHome ? "none" : "flex"} href="/">
            <h1 className="brand-logo">
              KARAOKE NITE
              <span className="brand-betatag">beta</span>
            </h1>
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
              <Link
                href="/about"
                fontSize={{ _: 16, sm: 20 }}
                textTransform="uppercase"
              >
                About
                <span className="navbar-linkIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <use href="#arrow" />
                  </svg>
                </span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="/blog"
                fontSize={{ _: 16, sm: 20 }}
                textTransform="uppercase"
              >
                Blog
                <span className="navbar-linkIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <use href="#arrow" />
                  </svg>
                </span>
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="/faq"
                fontSize={{ _: 16, sm: 20 }}
                textTransform="uppercase"
              >
                FAQ
                <span className="navbar-linkIcon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <use href="#arrow" />
                  </svg>{" "}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

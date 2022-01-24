import Link from "next/link";

export const Header = () => {
  return (
    <header role="banner" class="header">
      <nav class="navbar">
        <div class="navbar-section navbar-section__left">
          <a class="navbar-link__home" href="/">
            <h1 class="brand-logo">
              KARAOKE NITE
              <span class="brand-betatag">beta</span>
            </h1>
          </a>
          <button class="navbar-toggle">
            <svg
              class="navbar-toggleIcon navbar-toggleIcon__open"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <use href="#menu" />
            </svg>
            <svg
              class="navbar-toggleIcon navbar-toggleIcon__close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <use href="#close" />
            </svg>
          </button>
        </div>
        <div class="navbar-section navbar-section__right">
          <ul class="navbar-list">
            <li class="navbar-item">
              <Link href="/about" passHref>
                <a class="navbar-link">
                  About
                  <span class="navbar-linkIcon">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>
                  </span>
                </a>
              </Link>
            </li>
            <li class="navbar-item">
              <Link href="/blog" passHref>
                <a class="navbar-link">
                  Blog
                  <span class="navbar-linkIcon">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>
                  </span>
                </a>
              </Link>
            </li>
            <li class="navbar-item">
              <Link href="/faq" passHref>
                <a class="navbar-link">
                  FAQ
                  <span class="navbar-linkIcon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <use href="#arrow" />
                    </svg>{" "}
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

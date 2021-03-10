import React from "react";

import { IoHomeOutline } from "react-icons/io5";

import "./feed.css";

const Footer = () => {
  return (
    <div style={{ color: "#C7C7C7", fontSize: "11px" }}>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/"
            className="a-tags  text-muted "
          >
            About.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a href="https://help.instagram.com/" className="a-tags  text-muted ">
            Help.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/en_US/blog"
            className="a-tags  text-muted "
          >
            Press.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://www.instagram.com/developer/"
            className="a-tags  text-muted "
          >
            API.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/about-us/careers"
            className="a-tags  text-muted "
          >
            Careers.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/"
            className="a-tags  text-muted "
          >
            Privacy.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/"
            className="a-tags  text-muted "
          >
            Terms.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/"
            className="a-tags  text-muted "
          >
            Location.{" "}
          </a>
        </span>{" "}
      </p>
      <p className="mb-1 mt-2 ml-auto d-inline ">
        <span>
          <a
            href="https://about.instagram.com/"
            className="a-tags  text-muted "
          >
            Languge.{" "}
          </a>
        </span>{" "}
      </p>

      <p className="mt-5">© 2021 INSTAGRAM FROM FACEBOOK</p>
    </div>
  );
};

export default Footer;

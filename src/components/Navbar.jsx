import CardNav from "./CardNav";
const Navbar = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      description:
        "I’m a Full-Stack Developer passionate about building accessible, performant, and user-friendly applications.",
      link: "#about",
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      link: "#projects",
      description:
        "From queue management systems to responsive UIs, discover the projects I’ve built using modern frameworks and tools.",
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      description:
        "Let’s connect! Reach out for collaborations, opportunities, or just to say hi.",
      link: "#contact",
    },
     {
      label: "Experience",
      bgColor: "#271E37",
      textColor: "#fff",
      description:
        "Explore my professional journey, skills, and the technologies I excel in.",
      link: "#experience",
    },
  ];

  return (
    <>
      <CardNav
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </>
  );
};
export default Navbar;

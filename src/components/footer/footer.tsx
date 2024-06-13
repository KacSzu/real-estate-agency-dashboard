import FooterContent from "./footer-content";

const Footer = () => {
  return (
    <footer
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      className="relative h-[400px] sm:h-[300px] xl:h-[250px] bg-muted"
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+300px)] xl:h-[calc(100vh+250px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[300px] xl:h-[250px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-300px)] xl:top-[calc(100vh-250px)]">
          <FooterContent />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

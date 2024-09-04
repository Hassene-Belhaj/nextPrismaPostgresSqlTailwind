import AnimationWrapper from "@/utils/AnimationWrapper";

const About = () => {
  return (
    <AnimationWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} exit="exit">
      <section className="w-full min-h-[calc(100vh_-_64px)] max-h-full m-auto py-36 max-w-[800px] px-8">
        <h2 className="text-5xl">About</h2>
        <p className="py-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis placeat ipsa ut voluptates assumenda ex! Sequi repudiandae fugiat est eveniet deleniti? Possimus ullam, eaque architecto expedita minus et quisquam omnis aperiam obcaecati, debitis vero cupiditate. Quos excepturi
          reiciendis nemo saepe. Obcaecati harum voluptatibus in libero hic consequatur, facere fugiat laborum cumque sequi amet itaque sit corporis repellendus aperiam praesentium quos quas, repellat delectus unde blanditiis possimus nesciunt atque? Amet sit adipisci expedita soluta hic voluptates
          ipsam optio dicta similique ullam, earum veniam repellendus error odit voluptatum dolorum tempora culpa? Suscipit consequatur animi voluptate dolore iure molestias debitis molestiae totam dolorum qui iste porro quam quis cupiditate optio nisi tempore in facilis, repellat odit ullam
          impedit! Est facilis ipsa fuga, aspernatur possimus laudantium aperiam culpa corporis ex unde quisquam esse quidem sint itaque nesciunt iusto? Perspiciatis dicta, veritatis veniam ab ipsum nam animi! Officia incidunt tenetur odit ipsum veritatis sequi debitis quos esse blanditiis, iste
          pariatur libero cumque,
        </p>
      </section>
    </AnimationWrapper>
  );
};

export default About;

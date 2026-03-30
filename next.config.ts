import nextra from "nextra";
import createNextIntlPlugin from "next-intl/plugin";

const withNextra = nextra({
  contentDirBasePath: "/docs",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextra(withNextIntl({}));

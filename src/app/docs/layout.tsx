import { Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./docs.css";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/miwim-xyz/miwim-web/tree/master"
      editLink="Edit this page"
      footer={<span>© 2026 Miwim Network. All rights reserved.</span>}
      feedback={{ content: null }}
    >
      {children}
    </Layout>
  );
}

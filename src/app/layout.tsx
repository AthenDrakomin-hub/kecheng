import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '股票投资课程合集',
    template: '%s | 股票投资课程合集',
  },
  description:
    '股票投资课程合集，系统学习股票投资知识，掌握投资核心技能，从基础到进阶的完整学习体系。',
  keywords: [
    '股票投资',
    '投资课程',
    '股票学习',
    '投资技巧',
    '技术分析',
    '趋势交易',
    '仓位管理',
    '选股方法',
  ],
  authors: [{ name: '投资教育团队' }],
  generator: 'Coze Code',
  openGraph: {
    title: '股票投资课程合集',
    description:
      '系统学习股票投资知识，掌握投资核心技能，从基础到进阶的完整学习体系。',
    siteName: '股票投资课程合集',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}

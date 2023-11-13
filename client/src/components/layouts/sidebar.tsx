'use client';
import Link from 'next/link';
import { Sidebar } from 'flowbite-react';
import { Icons } from '@/components/icons';
import { useSelectedLayoutSegments } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function DefaultSidebar({ items }: any) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();

  const Component = ({ href, title, icon, highlight }: any) => {
    const Icon = Icons[icon || 'arrowRight'];

    return (
      <Link
        href={href}
        style={{
          background: highlight,
        }}
        className={`flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
      >
        {icon && <Icon className="mr-2 h-4 w-4" />}
        <span className="ml-1 text-sm">{title}</span>
      </Link>
    );
  };

  return (
    <Sidebar id="SIDEBAR">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {items.map((item: any, index: any) => {
            const isActive = pathname === (item?.href || item?.options[0].href);
            const highlight = isActive ? 'rgb(200 , 200 , 255 , 0.2)' : undefined;

            return (
              <div key={index}>
                {item.options ? (
                  <Sidebar.Collapse
                    // @ts-ignore
                    icon={Icons[item.icon]}
                    label={item.title}
                    style={{
                      background: highlight,
                    }}
                  >
                    {item.options.map((option: any, optIndex: any) => (
                      <Sidebar.Item key={optIndex}>
                        <Component {...option} />
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                ) : (
                  <Component {...item} highlight={highlight} />
                )}
              </div>
            );
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

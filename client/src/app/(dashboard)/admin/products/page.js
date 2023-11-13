import { Products } from '@/components/container';
export default async function AdminAllProducts() {
  return <Products title="All Products" limit={20} filter={true} />;
}

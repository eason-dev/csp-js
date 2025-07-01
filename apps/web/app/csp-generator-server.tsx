import { loadServices, getServiceRegistry } from '@csp-kit/generator';
import CSPGeneratorClient from './redesigned-csp-generator-client';

export default async function CSPGeneratorServer() {
  // Load services on the server side
  await loadServices();
  const registry = await getServiceRegistry();

  return <CSPGeneratorClient serviceRegistry={registry} />;
}

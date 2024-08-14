import { Layout } from "antd"
import SankeyGraph from "./components/SankeyGraph"

// Dummy data
const data = {
  nodes: [
    // 3rd-party
    { node: 'ais', name: "ais" },
    { node: 'ids', name: "ids" },
    { node: 'deltashare', name: "deltashare" },
    { node: 'azure_blob_storage', name: "azure_blob_storage" },
    { node: 'microsoft_power_bi', name: "power_bi" },
    { node: 'as_teg', name: "as_teg" },
    { node: 'solr', name: "solr" },
    { node: 'maximo', name: "maximo" },
    { node: 'kognifai', name: "kognifai" },
    { node: 'mqtt', name: "mqtt" },

    // portal components
    { node: 'custom_dashboard_component', name: "custom_dashboard_component" },
    { node: 'map_component', name: "map_component" },
    { node: 'power_bi_compoent', name: "power_bi_compoent" },
    { node: 'scanmax_component', name: "scanmax_component" },
    { node: 'digital_twin_component', name: "digital_twin_component" },
    { node: 'sensor_mapping_component', name: "sensor_mapping_component" },
    { node: 'documents_component', name: "documents_component" },
    { node: 'measure-1', name: "measure-1" },
    { node: 'measure-2', name: "measure-2" },
    { node: 'measure-3', name: "measure-3" },
    { node: 'visual-1', name: "visual-1" },
    { node: 'visual-2', name: "visual-2" },
    // 3rd layer
  ],
  links: [
    { source: "ais", target: "map_component", value: 10 },
    { source: "ids", target: "map_component", value: 10 },
    { source: "deltashare", target: "map_component", value: 10 },
    { source: "deltashare", target: "custom_dashboard_component", value: 20 },
    { source: "deltashare", target: "digital_twin_component", value: 10 },
    { source: "azure_blob_storage", target: "map_component", value: 10 },
    { source: "azure_blob_storage", target: "documents_component", value: 10 },
    { source: "microsoft_power_bi", target: "power_bi_compoent", value: 10 },
    { source: "as_teg", target: "scanmax_component", value: 10 },
    { source: "solr", target: "documents_component", value: 10 },
    { source: "maximo", target: "sensor_mapping_component", value: 10 },
    { source: "maximo", target: "digital_twin_component", value: 10 },
    { source: "kognifai", target: "digital_twin_component", value: 10 },
    { source: "kognifai", target: "sensor_mapping_component", value: 10 },
    { source: "mqtt", target: "digital_twin_component", value: 10 },
    { source: "mqtt", target: "digital_twin_component", value: 10 },
    { source: "custom_dashboard_component", target: "measure-1", value: 10 },
    { source: "measure-1", target: "visual-1", value: 10 },
    { source: "measure-1", target: "visual-2", value: 10 },
    { source: "measure-2", target: "visual-2", value: 10 },
    { source: "measure-3", target: "visual-2", value: 10 },
  ]
}

const App = () => {
  return <Layout >
    <SankeyGraph height={600} width={1240} data={data} />
  </Layout>
}

export default App

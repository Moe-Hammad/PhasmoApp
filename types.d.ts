type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageData: number;
};
type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface Window {
  // electron weil die Bridge im preload Skript so genannt wurde.
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}

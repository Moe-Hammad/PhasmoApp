type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageData: number;
};
type StatisticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
};

interface Window {
  // electron weil die Bridge im preload Skript so genannt wurde.
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StatisticData>;
  };
}

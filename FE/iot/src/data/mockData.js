import { tokens } from '../theme';

export const mockDataSensors = [
  {
    id: 1,
    temperature: 35,
    humidity: 68,
    light: 35,
    time: '2024-08-20 15:47:43',
  },
  {
    id: 2,
    temperature: 36,
    humidity: 78,
    light: 42,
    time: '2024-08-20 15:47:44',
  },
  {
    id: 3,
    temperature: 37,
    humidity: 79,
    light: 45,
    time: '2024-08-20 15:47:45',
  },
  {
    id: 4,
    temperature: 36,
    humidity: 79,
    light: 16,
    time: '2024-08-20 15:47:46',
  },
  {
    id: 5,
    temperature: 38,
    humidity: 79,
    light: 31,
    time: '2024-08-20 15:47:47',
  },
  {
    id: 6,
    temperature: 35,
    humidity: 68,
    light: 150,
    time: '2024-08-20 15:47:48',
  },
  {
    id: 7,
    temperature: 32,
    humidity: 79,
    light: 44,
    time: '2024-08-20 15:47:49',
  },
  {
    id: 8,
    temperature: 37,
    humidity: 78,
    light: 36,
    time: '2024-08-20 15:47:50',
  },
  {
    id: 9,
    temperature: 34,
    humidity: 69,
    light: 65,
    time: '2024-08-20 15:47:51',
  },
];
export const mockDataHistoryDevice = [
  {
    id: 1,
    name: 'Device Led-A',
    status: '0',
    time: '2024-08-20 15:47:43',
    action: '1',
  },
  {
    id: 2,
    name: 'Device Led-A',
    status: '1',
    time: '2024-08-20 15:47:43',
    action: '0',
  },
  {
    id: 3,
    name: 'Device Led-A',
    status: '0',
    time: '2024-08-20 15:47:43',
    action: '1',
  },
  {
    id: 4,
    name: 'Device Led-A',
    status: '1',
    time: '2024-08-20 15:47:43',
    action: '0',
  },
  {
    id: 5,
    name: 'Device Led-A',
    status: '0',
    time: '2024-08-20 15:47:43',
    action: '1',
  },
  {
    id: 6,
    name: '28Device Fan-A',
    status: '0',
    time: '2024-08-20 15:47:43',
    action: '1',
  },
  {
    id: 7,
    name: 'Device Led-A',
    status: '1',
    time: '2024-08-20 15:47:43',
    action: '0',
  },
  {
    id: 8,
    name: 'Device Led-A',
    status: '0',
    time: '2024-08-20 15:47:43',
    action: '1',
  },
  {
    id: 9,
    name: 'Device Fan-A',
    status: '1',
    time: '2024-08-20 15:47:43',
    action: '0',
  },
];

export const mockTransactions = [
  {
    txId: '01e4dsa',
    user: 'johndoe',
    date: '2021-09-01',
    cost: '43.95',
  },
  {
    txId: '0315dsaa',
    user: 'jackdower',
    date: '2022-04-01',
    cost: '133.45',
  },
  {
    txId: '01e4dsa',
    user: 'aberdohnny',
    date: '2021-09-01',
    cost: '43.95',
  },
  {
    txId: '51034szv',
    user: 'goodmanave',
    date: '2022-11-05',
    cost: '200.95',
  },
  {
    txId: '0a123sb',
    user: 'stevebower',
    date: '2022-11-02',
    cost: '13.55',
  },
  {
    txId: '01e4dsa',
    user: 'aberdohnny',
    date: '2021-09-01',
    cost: '43.95',
  },
  {
    txId: '120s51a',
    user: 'wootzifer',
    date: '2019-04-15',
    cost: '24.20',
  },
  {
    txId: '0315dsaa',
    user: 'jackdower',
    date: '2022-04-01',
    cost: '133.45',
  },
];

export const mockLineData = [
  {
    id: 'temperature',
    color: tokens('dark').greenAccent[500],
    data: [
      {
        x: 'plane',
        y: 101,
      },
      {
        x: 'helicopter',
        y: 75,
      },
      {
        x: 'boat',
        y: 36,
      },
      {
        x: 'train',
        y: 216,
      },
      {
        x: 'subway',
        y: 35,
      },
      {
        x: 'bus',
        y: 236,
      },
      {
        x: 'car',
        y: 88,
      },
      {
        x: 'moto',
        y: 232,
      },
      {
        x: 'bicycle',
        y: 281,
      },
      {
        x: 'horse',
        y: 1,
      },
      {
        x: 'skateboard',
        y: 35,
      },
      {
        x: 'others',
        y: 14,
      },
    ],
  },
  {
    id: 'Humidity',
    color: tokens('dark').blueAccent[300],
    data: [
      {
        x: 'plane',
        y: 212,
      },
      {
        x: 'helicopter',
        y: 190,
      },
      {
        x: 'boat',
        y: 270,
      },
      {
        x: 'train',
        y: 9,
      },
      {
        x: 'subway',
        y: 75,
      },
      {
        x: 'bus',
        y: 175,
      },
      {
        x: 'car',
        y: 33,
      },
      {
        x: 'moto',
        y: 189,
      },
      {
        x: 'bicycle',
        y: 97,
      },
      {
        x: 'horse',
        y: 87,
      },
      {
        x: 'skateboard',
        y: 299,
      },
      {
        x: 'others',
        y: 251,
      },
    ],
  },
  {
    id: 'Light',
    color: tokens('dark').redAccent[200],
    data: [
      {
        x: 'plane',
        y: 191,
      },
      {
        x: 'helicopter',
        y: 136,
      },
      {
        x: 'boat',
        y: 91,
      },
      {
        x: 'train',
        y: 190,
      },
      {
        x: 'subway',
        y: 211,
      },
      {
        x: 'bus',
        y: 152,
      },
      {
        x: 'car',
        y: 189,
      },
      {
        x: 'moto',
        y: 152,
      },
      {
        x: 'bicycle',
        y: 8,
      },
      {
        x: 'horse',
        y: 197,
      },
      {
        x: 'skateboard',
        y: 107,
      },
      {
        x: 'others',
        y: 170,
      },
    ],
  },
];



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

export const device = [
  {
    txId: '01e4dsa',
    name: 'Led A',
    type: 'Led',
    status: '0',
  },
  {
    txId: '0315dsaa',
    name: 'Led B',
    type: 'Led',
    status: '0',
  },
  {
    txId: '01e4dsa',
    name: 'Led C',
    type: 'Led',
    status: '1',
  },
  {
    txId: '51034szv',
    name: 'Led D',
    type: 'Led',
    status: '0',
  },
  {
    txId: '0a123sb',
    name: 'Fan A',
    type: 'Fan',
    status: '1',
  },
  {
    txId: '01e4dsa',
    name: 'Fan B',
    type: 'Fan',
    status: '0',
  },
  {
    txId: '120s51a',
    name: 'Fan C',
    type: 'Fan',
    status: '1',
  },
  {
    txId: '0315dsaa',
    name: 'Fan D',
    type: 'Fan',
    status: '0',
  },
];

export const mockLineData = [
  {
    id: 'temperature',
    color: tokens('dark').greenAccent[500],
    data: [
      {
        x: 1,
        y: 101,
      },
      {
        x: 2,
        y: 75,
      },
      {
        x: 3,
        y: 36,
      },
      {
        x: 4,
        y: 216,
      },
      {
        x: 5,
        y: 35,
      },
      {
        x: 6,
        y: 236,
      },
      {
        x: 7,
        y: 88,
      },
      {
        x: 8,
        y: 232,
      },
      {
        x: 9,
        y: 281,
      },
      {
        x: 10,
        y: 1,
      },
      {
        x: 11,
        y: 35,
      },
      {
        x: 12,
        y: 14,
      },
    ],
  },
  {
    id: 'Humidity',
    color: tokens('dark').blueAccent[300],
    data: [
      {
        x: 1,
        y: 212,
      },
      {
        x: 2,
        y: 190,
      },
      {
        x: 3,
        y: 270,
      },
      {
        x: 4,
        y: 9,
      },
      {
        x: 5,
        y: 75,
      },
      {
        x: 6,
        y: 175,
      },
      {
        x: 7,
        y: 33,
      },
      {
        x: 8,
        y: 189,
      },
      {
        x: 9,
        y: 97,
      },
      {
        x: 10,
        y: 87,
      },
      {
        x: 11,
        y: 299,
      },
      {
        x: 12,
        y: 251,
      },
    ],
  },
  {
    id: 'Light',
    color: tokens('dark').redAccent[200],
    data: [
      {
        x: 1,
        y: 191,
      },
      {
        x: 2,
        y: 136,
      },
      {
        x: 3,
        y: 91,
      },
      {
        x: 4,
        y: 190,
      },
      {
        x: 5,
        y: 211,
      },
      {
        x: 6,
        y: 152,
      },
      {
        x: 7,
        y: 189,
      },
      {
        x: 8,
        y: 152,
      },
      {
        x: 9,
        y: 8,
      },
      {
        x: 10,
        y: 197,
      },
      {
        x: 11,
        y: 107,
      },
      {
        x: 12,
        y: 170,
      },
    ],
  },
];

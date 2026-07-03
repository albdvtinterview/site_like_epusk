import {
  Activity,
  BatteryCharging,
  Boxes,
  Cable,
  Cog,
  Construction,
  Factory,
  Gauge,
  Handshake,
  PanelsTopLeft,
  Settings2,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react'
import { assetUrl } from '../lib/assetUrl'

export const catalog = [
  {
    slug: 'chastotnye-preobrazovateli',
    title: 'Частотные преобразователи',
    productCount: 11128,
    short: 'Точное управление скоростью и моментом электродвигателя.',
    description:
      'Подбираем преобразователи частоты для насосных, вентиляционных, конвейерных и производственных систем. Помогаем с настройкой и вводом в эксплуатацию.',
    tags: ['0,4–630 кВт', '220 / 380 / 690 В'],
    icon: Activity,
    slot: 'Фото частотного преобразователя',
    image: assetUrl('images/categories/frequency-converter.webp'),
  },
  {
    slug: 'ustroystva-plavnogo-puska',
    title: 'Устройства плавного пуска',
    productCount: 1878,
    short: 'Мягкий пуск оборудования без перегрузок и гидроударов.',
    description:
      'Решения для плавного разгона и остановки двигателей, защиты механики и снижения пусковых токов.',
    tags: ['Компактные', 'С байпасом'],
    icon: Gauge,
    slot: 'Фото устройства плавного пуска',
    image: assetUrl('images/categories/soft-starter.webp'),
  },
  {
    slug: 'elektrodvigateli',
    title: 'Электродвигатели',
    productCount: 6397,
    short: 'Надёжные двигатели для общепромышленных задач.',
    description:
      'Асинхронные и специальные электродвигатели в стандартном и защищённом исполнении. Подбор по мощности, оборотам и монтажному исполнению.',
    tags: ['АИР / АИС', 'IE2–IE4'],
    icon: Cog,
    slot: 'Фото электродвигателя',
    image: assetUrl('images/categories/electric-motor.webp'),
  },
  {
    slug: 'promyshlennaya-avtomatika',
    title: 'Промышленная автоматика',
    productCount: 2879,
    short: 'Контроллеры, датчики и компоненты управления.',
    description:
      'Комплекс компонентов для построения современных АСУ ТП: ПЛК, панели оператора, датчики, реле и коммутационное оборудование.',
    tags: ['ПЛК и HMI', 'Датчики'],
    icon: PanelsTopLeft,
    slot: 'Фото промышленной автоматики',
    image: assetUrl('images/categories/industrial-automation.webp'),
  },
  {
    slug: 'motor-reduktory',
    title: 'Мотор-редукторы',
    productCount: 3298,
    short: 'Готовые приводные решения с нужным моментом.',
    description:
      'Цилиндрические, червячные, конические и планетарные мотор-редукторы для конвейеров, мешалок и подъёмных механизмов.',
    tags: ['До 50 000 Н·м', 'Разные исполнения'],
    icon: Settings2,
    slot: 'Фото мотор-редуктора',
    image: assetUrl('images/categories/gear-motor.webp'),
  },
  {
    slug: 'elektropitanie',
    title: 'Электропитание',
    productCount: 860,
    short: 'Стабильное питание для ответственного оборудования.',
    description:
      'Источники бесперебойного питания, стабилизаторы, блоки питания и компоненты распределения для промышленных систем.',
    tags: ['ИБП', '24 / 48 / 220 В'],
    icon: BatteryCharging,
    slot: 'Фото оборудования электропитания',
    image: assetUrl('images/categories/power-supply-equipment.webp'),
  },
  {
    slug: 'tali',
    title: 'Тали',
    productCount: 83,
    short: 'Подъёмное оборудование для цехов и складов.',
    description:
      'Электрические и ручные тали, комплектующие и системы управления грузоподъёмными механизмами.',
    tags: ['0,5–20 т', 'Цепные и канатные'],
    icon: Construction,
    slot: 'Фото промышленной тали',
    image: assetUrl('images/categories/industrial-hoist.webp'),
  },
]

export const services = [
  {
    title: 'Диспетчеризация и удалённое управление ТП',
    text: 'Контроль технологических параметров и управление объектом из единого интерфейса.',
    result: 'Мониторинг и управление 24/7',
    icon: Factory,
    slot: 'Фото диспетчеризации объекта',
    image: assetUrl('images/services/object-dispatching.webp'),
  },
  {
    title: 'Автоматизация систем управления',
    text: 'Разрабатываем АСУ ТП, программируем контроллеры и создаём понятные интерфейсы оператора.',
    result: 'Проект, ПО и документация',
    icon: PanelsTopLeft,
    slot: 'Фото автоматизированного производства',
    image: assetUrl('images/services/automated-production.webp'),
  },
  {
    title: 'Техническое обследование на объекте',
    text: 'Выезжаем на площадку, проверяем оборудование и рассчитываем объём модернизации.',
    result: 'Отчёт и точная калькуляция',
    icon: Wrench,
    slot: 'Фото технического обследования',
    image: assetUrl('images/services/technical-survey.webp'),
  },
  {
    title: 'Производство шкафов управления и НКУ',
    text: 'Проектируем и собираем шкафы под технологию заказчика с заводскими испытаниями.',
    result: 'Сборка, проверка и маркировка',
    icon: Boxes,
    slot: 'Фото шкафа управления',
    image: assetUrl('images/services/control-cabinet.webp'),
  },
  {
    title: 'Проектирование систем автоматики',
    text: 'Готовим схемы, спецификации, алгоритмы и рабочую документацию для нового объекта.',
    result: 'Решение, готовое к реализации',
    icon: Cable,
    slot: 'Фото инженерного проектирования',
    image: assetUrl('images/services/engineering-design.webp'),
  },
]

export const projects = [
  {
    title: 'Станция второго подъёма',
    type: 'Водоснабжение',
    text: 'Автоматическое поддержание давления с резервированием приводов.',
    stats: ['−18% энергозатрат', '4 агрегата'],
    slot: 'Фото станции второго подъёма',
    image: assetUrl('images/projects/second-lift-station.webp'),
  },
  {
    title: 'Управление станцией водоподготовки',
    type: 'Водоподготовка',
    text: 'Единый алгоритм работы оборудования водозаборного узла.',
    stats: ['Диспетчеризация', 'Автоматический режим'],
    slot: 'Фото станции водоподготовки',
    image: assetUrl('images/projects/water-treatment-station.webp'),
  },
  {
    title: 'Автоматизация производственной линии',
    type: 'Производство',
    text: 'Синхронизация приводов, контроль зон и единый операторский интерфейс.',
    stats: ['12 приводов', '+24% производительности'],
    slot: 'Фото производственной линии',
    image: assetUrl('images/projects/production-line.webp'),
  },
  {
    title: 'Модернизация сельского ВЗУ',
    type: 'Инфраструктура',
    text: 'Обновление силовой части и автоматики без длительной остановки объекта.',
    stats: ['Работа без оператора', 'Резервирование'],
    slot: 'Фото модернизированного ВЗУ',
    image: assetUrl('images/projects/modernized-vzu.webp'),
  },
  {
    title: 'Система вентиляции цеха',
    type: 'Энергоэффективность',
    text: 'Частотное регулирование с поддержанием давления и расписанием.',
    stats: ['Окупаемость 14 мес.', '75 кВт'],
    slot: 'Фото системы вентиляции',
    image: assetUrl('images/projects/ventilation-system.webp'),
  },
]

export const advantages = [
  {
    value: '15 минут',
    label: 'средний ответ на заявку',
    icon: Zap,
  },
  {
    value: '99%',
    label: 'поставок точно в срок',
    icon: ShieldCheck,
  },
  {
    value: 'Вся Россия',
    label: 'доставка до вашего объекта',
    icon: Factory,
  },
  {
    value: 'Под ключ',
    label: 'от подбора до запуска',
    icon: Handshake,
  },
]

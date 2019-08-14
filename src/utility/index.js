import Noty from 'noty'

export const showNoty = function (text, type = 'error') {
  new Noty({
    text,
    type,
    timeout: 3000,
    layout: 'topCenter'
  }).show()
}

export const TASK_TYPES = [
  'Просрочено',
  'В работе',
  'Сделано'
];

//Для тестирования в случае если нету никаких заданий
export const defaultTasks = [];

export const tags = [];

export const DEADLINE_TYPES = [
  'Просроченные Задачи',
  'Непросроченные Задачи'
];


export const Schedules = [
  {
    date: 'Mon, Jun 17',
    sch: [{
      location: 'Prince Ebeano Stores',
      time: '09:00am',
      address: 'Admiralty way, Lekki Phase 1, Lagos',
      status: 'In Progress',
      mobile: '+2348100131944',
      extras: [{
        icon: 'list',
        value: 'Details',
        label: 'Tap to show'
      },{
        icon: 'call',
        value: '08100131944',
        label: 'Tap to call'
      },{
        icon: 'walk',
        value: 'Visit Outlet',
        label: 'Proceed'
      }]
    },{
      location: 'Prince Ebeano Stores',
      time: '09:00am',
      address: 'Admiralty way, Lekki Phase 1, Lagos',
      status: 'Completed',
      mobile: '+2348100131944',
      extras: [{
        icon: 'list',
        value: 'Details',
        label: 'Tap to show'
      },{
        icon: 'call',
        value: '08100131944',
        label: 'Tap to call'
      },{
        icon: 'walk',
        value: 'Visit Outlet',
        label: 'Proceed'
      }]
    }]
  },{
    date: 'Tue, Jun 18',
    sch: [{
      location: 'Prince Ebeano Stores',
      time: '09:00am',
      address: 'Admiralty way, Lekki Phase 1, Lagos',
      status: 'Not Started',
      mobile: '+2348100131944',
      extras: [{
        icon: 'list',
        value: 'Details',
        label: 'Tap to show'
      },{
        icon: 'call',
        value: '08100131944',
        label: 'Tap to call'
      },{
        icon: 'walk',
        value: 'Visit Outlet',
        label: 'Proceed'
      }]
    }]
  },
];

export const SchedulesCount = () => {
  var count = 0;
  Schedules.map((i, j) => {
    i.sch.map((k, l) => {
      count++;
    });
  });
  return count;
}
import type { Zone, ZoneStatus, District, ZoneFormState } from '@/lib/types/zone';

export const ZONES_DATA: Zone[] = [
  { id:'z01', name:'Kimironko North', code:'KIM-N', district:'Gasabo',     sector:'Kimironko',  clients:24, driver:'Jean P.',      schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z02', name:'Remera Central',  code:'REM-C', district:'Gasabo',     sector:'Remera',     clients:18, driver:'Diane U.',     schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z03', name:'Gisozi East',     code:'GIS-E', district:'Gasabo',     sector:'Gisozi',     clients:21, driver:'Patrick N.',   schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z04', name:'Kacyiru South',   code:'KAC-S', district:'Gasabo',     sector:'Kacyiru',    clients:31, driver:'Aimable R.',   schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z05', name:'Kibagabaga',      code:'KIB-A', district:'Gasabo',     sector:'Kibagabaga', clients:19, driver:'Théodore K.',  schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z06', name:'Kanombe East',    code:'KAN-E', district:'Kicukiro',   sector:'Kanombe',    clients:16, driver:null,           schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z07', name:'Muhima North',    code:'MUH-N', district:'Nyarugenge', sector:'Muhima',     clients:16, driver:'Jean P.',      schedule:'Monday',    scheduleOrder:1, status:'active'    },
  { id:'z08', name:'Kinyinya',        code:'KIN-A', district:'Gasabo',     sector:'Kinyinya',   clients:15, driver:'Diane U.',     schedule:'Tuesday',   scheduleOrder:2, status:'active'    },
  { id:'z09', name:'Rugando',         code:'RUG-B', district:'Gasabo',     sector:'Kinyinya',   clients:20, driver:'Patrick N.',   schedule:'Tuesday',   scheduleOrder:2, status:'active'    },
  { id:'z10', name:'Niboye',          code:'NIB-A', district:'Kicukiro',   sector:'Niboye',     clients:22, driver:'Aimable R.',   schedule:'Tuesday',   scheduleOrder:2, status:'active'    },
  { id:'z11', name:'Gasabo Heights',  code:'GAS-H', district:'Gasabo',     sector:'Gasabo',     clients:22, driver:'Claudine M.', schedule:'Wednesday', scheduleOrder:3, status:'active'    },
  { id:'z12', name:'Ndera Village',   code:'NDE-A', district:'Gasabo',     sector:'Ndera',      clients:17, driver:'Jean P.',      schedule:'Wednesday', scheduleOrder:3, status:'active'    },
  { id:'z13', name:'Bumbogo',         code:'BUM-A', district:'Gasabo',     sector:'Bumbogo',    clients:14, driver:'Théodore K.',  schedule:'Wednesday', scheduleOrder:3, status:'active'    },
  { id:'z14', name:'Jali Central',    code:'JAL-B', district:'Gasabo',     sector:'Jali',       clients:11, driver:'Diane U.',     schedule:'Thursday',  scheduleOrder:4, status:'active'    },
  { id:'z15', name:'Kagarama',        code:'KAG-A', district:'Kicukiro',   sector:'Kagarama',   clients:18, driver:'Patrick N.',   schedule:'Thursday',  scheduleOrder:4, status:'active'    },
  { id:'z16', name:'Nyamirambo West', code:'NYA-W', district:'Nyarugenge', sector:'Nyamirambo', clients:27, driver:'Claudine M.', schedule:'Friday',    scheduleOrder:5, status:'active'    },
  { id:'z17', name:'Gatenga South',   code:'GAT-B', district:'Kicukiro',   sector:'Gatenga',    clients:14, driver:'Aimable R.',   schedule:'Friday',    scheduleOrder:5, status:'active'    },
  { id:'z18', name:'Masaka',          code:'MAS-A', district:'Kicukiro',   sector:'Masaka',     clients:11, driver:'Théodore K.',  schedule:'Friday',    scheduleOrder:5, status:'inactive'  },
  { id:'z19', name:'Kimicanga',       code:'KIM-C', district:'Nyarugenge', sector:'Nyamirambo', clients:11, driver:null,           schedule:'Saturday',  scheduleOrder:6, status:'suspended' },
];

export const STATUS_BADGE: Record<ZoneStatus, 'success' | 'neutral' | 'danger'> = {
  active:    'success',
  inactive:  'neutral',
  suspended: 'danger',
};

export const STATUS_LABEL: Record<ZoneStatus, string> = {
  active:    'Active',
  inactive:  'Inactive',
  suspended: 'Suspended',
};

export const DISTRICTS: District[] = ['Gasabo', 'Kicukiro', 'Nyarugenge'];
export const DRIVERS     = ['Jean P.', 'Diane U.', 'Patrick N.', 'Aimable R.', 'Claudine M.', 'Théodore K.'];
export const SCHEDULE_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EMPTY_FORM: ZoneFormState = {
  name: '', code: '', district: 'Gasabo', sector: '',
  driver: '', schedule: 'Monday', status: 'active', notes: '',
};

export const DUMMY_FORM: ZoneFormState = {
  name: 'Kimisagara East', code: 'KIM-E', district: 'Nyarugenge', sector: 'Kimisagara',
  driver: 'Jean P.', schedule: 'Wednesday', status: 'active',
  notes: 'Covers lower Kimisagara — 3 apartment blocks near the market.',
};

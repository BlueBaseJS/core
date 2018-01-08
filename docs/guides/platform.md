## Platform
Extends ReactXP's platform api to add support for `server` and `electron` platforms.
This interface provides information about the OS or runtime platform on which the app is running.



```javascript
import BR from '@blueeast/bluerain-os';

console.log(BR.Platform.getType());
```

### Types
``` javascript
type PlatformType = 'web' | 'ios' | 'android' | 'windows' | 'electron';
```


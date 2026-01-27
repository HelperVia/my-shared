# @helpervia/shared

**Proprietary Software - All Rights Reserved**

Shared types, constants, utilities, hooks and contexts for HelperVia projects.

## ⚠️ License

This is proprietary software owned by HelperVia. Unauthorized use, distribution, 
or modification is strictly prohibited. See [LICENSE](./LICENSE) for details.

## 🔒 Usage

This package is for internal use within authorized HelperVia projects only.

### Installation

```bash
npm install github:HelperVia/my-shared
```

### Import Examples

```typescript
// Server-safe imports (API routes)
import { ApiResponseServer, ApiException } from "@helpervia/shared";

// Client-only imports
import { useDeviceDetect } from "@helpervia/shared/client";
import { GlobalLoadingProvider } from "@helpervia/shared/client";

// Specific modules
import { apiResponse } from "@helpervia/shared/lib";
import { YesNo } from "@helpervia/shared/constants";
```

## 📞 Contact

For licensing inquiries: ydemirtas1745@gmail.com

---

Copyright (c) 2025 HelperVia / Yaşar Demirtaş - All Rights Reserved

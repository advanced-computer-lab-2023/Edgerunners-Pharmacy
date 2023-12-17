# El-7a2ni pharmacy API References

#### Signin
```http
  POST /signin
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |
| `Password` | `String` | **Required** |

#### Reset Password
```http
  PUT /ResetPass
```
| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `Email`   | `String` | **Required** |

#### change password
```http
  PUT /changePassword
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |
| `Password` | `String` | **Required** |
| `Comfirm`  | `String` | **Required** |

#### create Patient
```http
  POST /addPatient
```
| Parameter    | Type     | Description  |
| :---------   | :------- | :----------- |
| `Username`   | `String` | **Required** |
| `Password`   | `String` | **Required** |
| `Name`       | `String` | **Required** |
| `Email`      | `String` | **Required** |
| `DOB`        | `Date`   | **Required** |
| `Gender`     | `String` | **Required** |
| `phoneNumber`| `String` | **Required** |

#### get patients
```http
  GET /getPatient
```

#### update patient
```http
  PUT /updatePatient
```
| Parameter          | Type     | Description  |
| :---------         | :------- | :----------- |
| `Username`         | `String` | **Required** |
| `OrderName`        | `String` | **Required** |
| `OrderQuantity`    | `Number` | **Required** |
| `OrderPrice`       | `Number` | **Required** |

#### increment quantity
```http
  PUT /incrementQuantity
```
| Parameter          | Type     | Description  |
| :---------         | :------- | :----------- |
| `Username`         | `String` | **Required** |
| `OrderName`        | `String` | **Required** |
| `OrderPrice`       | `String` | **Required** |

#### remove from cart
```http
  PUT /removeFromCart
```
| Parameter          | Type     | Description  |
| :---------         | :------- | :----------- |
| `Username`         | `String` | **Required** |
| `OrderName`        | `String` | **Required** |

#### get cart
```http
  GET /getcart
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### decrement quantity
```http
  PUT /decrementQuantity
```
| Parameter          | Type     | Description  |
| :---------         | :------- | :----------- |
| `Username`         | `String` | **Required** |
| `OrderName`        | `String` | **Required** |
| `OrderPrice`       | `String` | **Required** |

#### update address
```http
  PUT /updateAddress
```
| Parameter   | Type     | Description  |
| :---------  | :------- | :----------- |
| `Username`  | `String` | **Required** |
| `State`     | `String` | **Required** |
| `City`      | `String` | **Required** |
| `Street`    | `String` | **Required** |
| `Apartment` | `String` | **Required** |

#### get address
```http
  GET /getAddress
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### delete patient
```http
  DELETE /deletePatient
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### get order
```http
  GET /getOrder
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### add order
```http
  PUT /addOrder
```
| Parameter       | Type     | Description  |
| :---------      | :------- | :----------- |
| `Username`      | `String` | **Required** |
| `orderAddress`  | `Array`  | **Required** |
| `paymentMethod` | `String` | **Required** |

#### cancel order
```http
  PUT /cancelOrder
```
| Parameter    | Type     | Description  |
| :---------   | :------- | :----------- |
| `Username`   | `String` | **Required** |
| `orderid`    | `Number` | **Required** |
| `totalprice` | `Number` | **Required** |

#### get wallet
```http
  GET /getWallet
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### get sales
```http
  GET /getSales
```
| Parameter      | Type     | Description  |
| :---------     | :------- | :----------- |
| `month`        | `Number` | **Required** |
| `medicineName` | `String` | **Required** |
| `date`         | `String` | **Required** |

#### pop order
```http
  PUT /popOrder
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### get one patient
```http
  GET /getOnePatient
```
| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `Username` | `String` | **Required** |

#### createPharmacist
```http
POST /addPharmacist
```

#### uploadFile
```http
POST /uploadFile
```

#### getPharmacists
```http
GET /getPharmacist
```

#### updatePharmacist
```http
PUT /updatePharmacist
```

#### deletePharmacist
```http
DELETE /deletePharmacist
```

#### uploadDocument
```http
POST /uploadDocument
```

#### viewFiles
```http
GET /viewFiles/:filename
```

#### getOnePharmacist
```http
GET /getOnePharmacist
```

#### notifyOutOfStock
```http
PUT /notifyOutOfStock
```

#### getOneMedicine
```http
GET /getBoolean
```

#### showAlternatives
```http
GET /showAlternatives
```

#### createMedicine
```http
POST /addMedicine
```

#### getMedicines
```http
GET /getMedicine
```

#### getMedicinesPharm
```http
GET /getMedicinePharm
```

#### getMedicinalUse
```http
GET /getMedicinalUse
```

#### getActiveIngredient
```http
GET /getActiveIngredient
```

#### setMedicinalUse
```http
PUT /setMedicinalUse
```

#### setActiveIngredient
```http
PUT /setActiveIngredient
```

#### updateMedicine
```http
PUT /updateMedicine
```

#### archiveMedicine
```http
PUT /archiveMedicine
```

#### unarchiveMedicine
```http
PUT /unarchiveMedicine
```

#### updateQuantity
```http
PUT /updateQuantity
```

#### reverseQuantity
```http
PUT /reverseQuantity
```

#### createAdmin
```http
POST /addAdmin
```

#### getAdmins
```http
GET /getAdmin
```

#### updateAdmin
```http
PUT /updateAdmin
```

#### deleteAdmin
```http
DELETE /deleteAdmin
```

#### getOneAdmin
```http
GET /getOneAdmin
```
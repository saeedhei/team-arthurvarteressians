<template>
     <div class="f-modal-icon f-modal-warning scaleWarning">
       <span class="f-modal-body pulseWarningIns"></span>
       <span class="f-modal-dot pulseWarningIns"></span>
     </div>
   </template>
   
   <style scoped>
   .f-modal-icon {
     border-radius: 50%;
     border: 4px solid #F8BB86;
     width: 80px;
     height: 80px;
     position: relative;
   }
   
   .scaleWarning {
     animation: scaleWarning 0.75s infinite alternate;
   }
   
   .pulseWarningIns {
     animation: pulseWarningIns 0.75s infinite alternate;
   }
   
   .f-modal-body {
     background-color: #F8BB86;
     border-radius: 2px;
     height: 47px;
     left: 50%;
     margin-left: -2px;
     position: absolute;
     top: 10px;
     width: 5px;
     z-index: 2;
   }
   
   .f-modal-dot {
     background-color: #F8BB86;
     border-radius: 50%;
     bottom: 10px;
     height: 7px;
     left: 50%;
     margin-left: -3px;
     position: absolute;
     width: 7px;
     z-index: 2;
   }
   
   @keyframes scaleWarning {
     0% { transform: scale(1); }
     30% { transform: scale(1.02); }
     100% { transform: scale(1); }
   }
   
   @keyframes pulseWarningIns {
     0% { background-color: #F8D486; }
     100% { background-color: #F8BB86; }
   }
   </style>
   
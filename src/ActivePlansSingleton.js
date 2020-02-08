export default class ActivePlansSingleton {
    static instance = null;
    activePlans = JSON.parse(sessionStorage.getItem("activePlans"));

    static getInstance() {
        if(ActivePlansSingleton.instance == null) {
            ActivePlansSingleton.instance = new ActivePlansSingleton()
        }
        return this.instance;
    }

    getPlans() {
        return this.activePlans;
    }
}

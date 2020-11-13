@isTest
public class kanbanControllerTestClass {
    static testMethod  void testMethod1(){
        Test.startTest();
        kanbanController Obj = new kanbanController();
        List<String> Fields = new list<String> { 'Name','Id','SLA__c'};
		kanbanController.getdata('Account',Fields);
        Test.stopTest();
    }
    static testMethod  void testMethod2(){
        Test.startTest();
        Account actObject = new Account(Name='SalesforceCody');
        insert actObject;
        
        actObject.Name='Salesforce Cody';
        
		kanbanController.updateSobjectRecord('Account',actObject);
        Test.stopTest();
    }
}
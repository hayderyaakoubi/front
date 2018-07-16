from account.Account import Account, Accounts, Customer, Monitor
from app_main.config import application,api
from authentication.login import Login, Test
from bill.Bill import Bill
from Alert.Alerts import Alerts
from influxDATA.graph import HourlyData, DailyData, MonthlyData, RealTime, EveryMinute, MonthlyConsumption
from pwd_Security.password import User
from rule.Rule import Rule

@application.route('/')
def Hello():
    return 'hello Techability'


ns_bills = api.namespace('bills', description='Operations related to Bills')
ns_alerts = api.namespace('alerts', description='Operations related to Alerts')
ns_accounts = api.namespace('accounts', description='Operations related to Accounts')
ns_account=api.namespace('account', description='Operations related to a Single Account')
ns_rule = api.namespace('rules', description='Operations related to Rules')
ns_graph = api.namespace('influx', description='Operation related to Graphs')
ns_auth= api.namespace('auth',description="authentication phase")
ns_pwd = api.namespace('password', description='This how password are being hashed')
ns_monitor=api.namespace('monitor',description='monitors definitions')

ns_bills.add_resource(Bill, '/<int:monitor_id>', endpoint='bill')
ns_accounts.add_resource(Accounts,'/<int:customer_id>',methods=['GET','POST'])
ns_accounts.add_resource(Accounts,'/<int:customer_id>/<email>',methods=['Delete'])
ns_account.add_resource(Account, '/<int:account_id>')
ns_account.add_resource(Customer,'/<string:email>')
ns_monitor.add_resource(Monitor,'/<int:custID>')
ns_alerts.add_resource(Alerts,'/<int:monitorid>')
ns_rule.add_resource(Rule,'/<int:customer_id>/<int:account_id>')
ns_graph.add_resource(HourlyData,'/<string:db>/hourly')
ns_graph.add_resource(DailyData,'/<string:db>/daily','<string:db>/<day>')
ns_graph.add_resource(MonthlyData,'/<string:db>/monthly')
ns_graph.add_resource(RealTime,'/<string:db>/realtime')
ns_graph.add_resource(EveryMinute,'/<string:db>/minute')
ns_graph.add_resource(MonthlyConsumption,'/<string:db>/monthconsum')
# api.add_resource(PostApi,'/api/post','/api/post/<int:post_id>',endpoint='api')
ns_pwd.add_resource(User,'/<password>')
ns_auth.add_resource(Login,'')
ns_auth.add_resource(Test,'/test')

if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0', port=5000)

from django.shortcuts import get_object_or_404, redirect, render



def home(request):
    # orders=Order.objects.all()
    # customers=Customer.objects.all()
    # # total_customers=customers.count()
    # total_order=orders.count()
    # delivered = orders.filter(status='Delivered').count()
    # pending=orders.filter(status= 'Pending').count()

    context={}
    return render(request,'Medibridge/index.html',context)

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SourceSerializer
from django.shortcuts import get_object_or_404 


from .models import Source
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#def index(request):
#    return HttpResponse("Hello, world. You're at the sources index. Test")

@api_view(['GET'])
def index(request):
    api_urls = {
        'List': '/list/',
        'View': '/view/<str:pk>/',
        'Create': '/create/',
        'Update': '/update/<str:pk>',
        'Delete': '/delete/<str:pk>',
        'Page': '/page/<str:page>'
    }
    return Response(api_urls)

@api_view(['GET'])
def sourceList(request):
    sources = Source.objects.all()
    serializer = SourceSerializer(sources, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def sourcePage(request, page):
    sources_list = Source.objects.all()
    pge = page
    try:
        pge = int(page)
        if pge < 1:
            pge = 1
    except ValueError:
        pge = 1

    paginator = Paginator(sources_list, 10)

    try:
        sources = paginator.page(pge)
    except PageNotAnInteger:
        sources = paginator.page(1)
        pge = 1
    except EmptyPage:
        sources = paginator.page(paginator.num_pages)
        pge = paginator.num_pages

    serializer = SourceSerializer(sources, many=True)
    return Response({
        'sources': serializer.data, 
        'num_pages': paginator.num_pages,
        'page': pge,
    })


@api_view(['GET'])
def sourceView(request, pk):
    sources = get_object_or_404(
		Source,
		id=pk
	)
    
    serializer = SourceSerializer(sources, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def sourceCreate(request):
    serializer = SourceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else: 
        return JsonResponse(serializer.errors)

@api_view(['POST'])
def sourceUpdate(request, pk):
    sources = get_object_or_404(
		Source,
		id=pk
	)
    serializer = SourceSerializer(instance=sources, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else: 
        return JsonResponse(serializer.errors)

@api_view(['DELETE'])
def sourceDelete(request, pk):
    sources = get_object_or_404(
		Source,
		id=pk
	)
    sources.delete()

    return Response("Item successfully deleted!")





import random
import string
import sys

from timeit import default_timer as timer
from lxml import etree

# def sample_xml(opts):
#     """Return the sample XML file as a string."""
#     with open('sample.xml', opts) as xml:
#         return xml.read()

def parse_etree_lxml():

    timer_start = timer()

    print('[etree lxml] Starting to parse XML')

    catalog = etree.parse('sample.xml')
    book = catalog.find('book')
    id=book.find('ID')
    print(id.text)
    # Print the loaded XML
    # print(etree.tostring(root))

    seconds = timer() - timer_start

    print(f'[etree lxml] Finished parsing XML in {seconds} seconds')

parse_etree_lxml()
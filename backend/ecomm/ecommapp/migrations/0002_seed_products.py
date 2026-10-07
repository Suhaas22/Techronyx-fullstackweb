from django.db import migrations


PRODUCTS = [
    (1, "Apple Wired Earpods with Mic (USB Type-C)", "products/applewiredearphones.jpeg", 3.8, 41, "2000.00", "1900.00", "5%", "Save ₹100", False),
    (2, "JBL T50HIBLUIN Wired Earphone with Mic (Blue)", "products/JBLwiredearphones.jpeg", 4.1, 63, "999.00", "549.00", "45%", "Save ₹450", False),
    (3, "boAt BassHeads 100 Wired Earphone with Mic (Black)", "products/boatwiredearphones.jpeg", 4.1, 61, "999.00", "299.00", "70%", "Save ₹700", False),
    (4, "Realme AirBuds Pro 3 TWS Earbuds with ANC & Quad Mic (Cyan)", "products/realmeearbuds.jpeg", 3.6, 41, "1600.00", "1100.00", "5%", "Save ₹100", False),
    (5, "boAt Airdopes 141 Bluetooth Earbuds with 42H Playtime (Bold Green)", "products/boatairdopes.jpeg", 4.3, 63, "1399.00", "1149.00", "45%", "Save ₹450", True),
    (6, "OnePlus Buds Q2 Neo Truly Wireless Earbuds with Bass Boost (Cyber Blue)", "products/oneplusairbuds.jpeg", 4.0, 61, "999.00", "699.00", "70%", "Save ₹700", False),
    (7, "Boult X Mustang Bluetooth Headphones with 70H Playtime, 40mm Bass Drivers", "proddetails/boultmain.png", 3.6, 41, "1600.00", "1100.00", "5%", "Save ₹100", True),
    (8, "Bose QuietComfort Wireless Noise Cancelling Headphones with Spatial Audio, with Mic, Up to 24 Hours of Battery Life, Black", "products/boseheadphones.jpeg", 4.3, 63, "1399.00", "1149.00", "45%", "Save ₹450", False),
    (9, "Sony WH-CH720N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Mic, Up to 35Hrs Battery, Customized EQ- Black", "products/sonyheadphones.jpeg", 4.0, 61, "999.00", "699.00", "70%", "Save ₹700", False),
]


def seed_products(apps, schema_editor):
    Product = apps.get_model("ecommapp", "Product")
    for product in PRODUCTS:
        pk, title, image, rating, reviews, old_price, new_price, discount, offer, bestseller = product
        Product.objects.get_or_create(
            pk=pk,
            defaults={
                "title": title,
                "image": image,
                "rating": rating,
                "reviews": reviews,
                "old_price": old_price,
                "new_price": new_price,
                "discount": discount,
                "offer": offer,
                "bestseller": bestseller,
            },
        )


class Migration(migrations.Migration):
    dependencies = [("ecommapp", "0001_initial")]
    operations = [migrations.RunPython(seed_products, migrations.RunPython.noop)]

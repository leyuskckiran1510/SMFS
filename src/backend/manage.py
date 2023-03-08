#!./../virtual/bin/python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "heart.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    sys.argv = (
        "|".join(sys.argv)
        .replace("|mk", "|makemigrations")
        .replace("|mg", "|migrate")
        .replace("|cu", "|createsuperuser")
        .split("|")
    )
    if len(sys.argv) < 2:
        sys.argv.append("runserver")
        sys.argv.append("0.0.0.0:1234")
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()

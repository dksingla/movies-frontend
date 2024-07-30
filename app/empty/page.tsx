import Button from "../components/Button"

export default function emptyState() {
   return(
    <div className="flex flex-col min-h-screen items-center justify-center bg-background">
                <h6 className="text-6xl font-medium   mb-8 text-center text-yellow-50">Your movie list is empty</h6>
                <Button className="w-40 text-sm text-yellow-50  font-bold mt-4" text="Add a new movie" type="button"></Button>

      

    </div>
   )
}